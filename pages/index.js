import { 
    PageHeader, 
    Button, 
    Table, 
    Modal,
    Form,
    Input 
} from 'antd';
import "../app.sass";
import columns from '../config/user-column-config';

class Home extends React.Component {
    
    state = { 
        visible: false,
        users: []
    };

    handleAddNewClick = () => {
        this.toggleModal();
    }

    handleModalOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.Id = this.state.users.length + 1;
                this.setState({ users: [...this.state.users, values]});
                this.props.form.resetFields();
                this.toggleModal();
            }
        });
    }

    handleModalCancel = () => {
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            visible: !this.state.visible,
          });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <PageHeader className="header">Users</PageHeader>
                <div className="addNewBtnContainer">
                    <Button className="addNewBtn" onClick={this.handleAddNewClick}>Add User</Button>
                </div>
                <Table dataSource={this.state.users} columns={columns} />;
                <Modal
                  title="Add User"
                  visible={this.state.visible}
                  onOk={this.handleModalOk}
                  onCancel={this.handleModalCancel}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter name of the user' }],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please enter email of the user' },
                                { type: 'email', message: 'The input is not valid E-mail!'}],
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