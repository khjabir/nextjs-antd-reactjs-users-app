import { 
    PageHeader, 
    Button, 
    Table, 
    Modal,
    Form,
    Input,
    Icon,
    notification 
} from 'antd';
import "../app.sass";
import { userErrorMessages } from '../config/messages';

class Home extends React.Component {
    
    state = { 
        visible: false,
        users: [],
        currentUser: null,
        confirmVisible: false
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
        this.showUserSuccessToast('added')
    }

    editUser(values) {
        var currentUserIndex = this.state.users.findIndex(x => x.Id == this.state.currentUser);
        var users = this.state.users;
        users[currentUserIndex] = { ...values, Id: this.state.currentUser};
        this.setState({users, currentUser: null});
        this.showUserSuccessToast('edited')
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

    onDelete = () => {
        const users = this.state.users.filter(user => user.Id !== this.state.currentUser);
        this.setState({ users, currentUser: null });
        this.toggleConfirmModal();
        this.showUserSuccessToast('deleted')
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

    toggleConfirmModal = (userId) => {
        this.setState({
            confirmVisible: !this.state.confirmVisible,
            currentUser: userId
        });
    }

    showUserSuccessToast(msg) {
        notification.success({
            message: 'Success',
            description: `User ${msg} successfully.`,
            duration: 3,
            onClick: () => {
                notification.destroy();
            },
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
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
                    <span className="actionIcon" onClick={(e) => { this.onEdit(record.Id, e); }}>
                        <Icon type="edit" />
                    </span>
                  ),
            },
            {
              title: 'Delete',
              dataIndex: 'delete',
              key: 'delete',
              width: '12%',
              render: (text, record) => (
                <span className="actionIcon" onClick={(e) => { this.toggleConfirmModal(record.Id); }}>
                    <Icon type="delete" />
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
                <Modal
                    title="Delete"
                    visible={this.state.confirmVisible}
                    onOk={this.onDelete}
                    onCancel={this.toggleConfirmModal}
                    okText="OK"
                    cancelText="Cancel"
                    >
                    <p>Are you sure you want to delete the user?</p>
                </Modal>
            </div>
        );
    }
}

const WrappedUserForm = Form.create({ name: 'user_form' })(Home);
export default WrappedUserForm;