import { 
    PageHeader, 
    Button, 
    Table, 
    Modal,
    Form,
    Input 
} from 'antd';
import "../app.sass";
import { userErrorMessages } from '../config/messages';

class Home extends React.Component {
    
    state = { 
        visible: false,
        users: [],
        currentUser: null
    };

    handleAddNewClick = () => {
        this.toggleModal();
    }

    handleModalOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.state.currentUser) {
                    this.editUser(values);
                } else {
                    this.addUser(values);
                }
                this.toggleModal();
            }
        });
    }

    addUser(values) {
        values.Id = this.state.users.length + 1;
        this.setState({ users: [...this.state.users, values]});
    }

    editUser(values) {
        var currentUserIndex = this.state.users.findIndex(x => x.Id == this.state.currentUser);
        var users = this.state.users;
        users[currentUserIndex] = { ...values, Id: this.state.currentUser};
        this.setState({users, currentUser: null});
    }

    handleModalCancel = () => {
        this.toggleModal();
    }

    toggleModal() {
        if(this.state.visible) {
            this.props.form.resetFields();
        }
        this.setState({
            visible: !this.state.visible,
        });
    }

    onDelete = (userId, e) => {
        e.preventDefault();
        const users = this.state.users.filter(user => user.Id !== userId);
        this.setState({ users });
    }

    onEdit = (userId, e) => {
        e.preventDefault();
        const user = this.state.users.find(user => user.Id === userId);
        this.props.form.setFieldsValue({
            name: user.name,
            email: user.email
        });
        this.setState({currentUser: user.Id});
        this.toggleModal();
    }


    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'edit',
                width: '12%',
                render: (text, record) => (
                    <span className="editIcon" onClick={(e) => { this.onEdit(record.Id, e); }}>
                      Edit
                    </span>
                  ),
            },
            {
              title: 'Delete',
              dataIndex: 'delete',
              key: 'delete',
              width: '12%',
              render: (text, record) => (
                <span className="" onClick={(e) => { this.onDelete(record.Id, e); }}>
                  Delete
                </span>
              ),
            }
          ];

        return (
            <div>
                <PageHeader className="header">Users</PageHeader>
                <div className="addNewBtnContainer">
                    <span className="tableCountInfo">{this.state.users.length} User{this.state.users.length !== 1 ? 's' : null}</span>
                    <Button className="addNewBtn" onClick={this.handleAddNewClick}>Add User</Button>
                </div>
                <div className="tableContainer">
                    <Table 
                        rowKey={record => record.Id}
                        dataSource={this.state.users} 
                        columns={columns} 
                    />
                </div>
                <Modal
                  title="Add User"
                  visible={this.state.visible}
                  onOk={this.handleModalOk}
                  onCancel={this.handleModalCancel}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: userErrorMessages.nameRequired }],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: userErrorMessages.emailRequired },
                                { type: 'email', message: userErrorMessages.invalidEmail }],
                        })(<Input type="textarea" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const WrappedUserForm = Form.create({ name: 'user_form' })(Home);
export default WrappedUserForm;