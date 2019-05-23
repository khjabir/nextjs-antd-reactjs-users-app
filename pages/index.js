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
import { userErrorMessages } from '../config/messages';

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
                    <span className="tableCountInfo">{this.state.users.length} User{this.state.users.length !== 1 ? 's' : null}</span>
                    <Button className="addNewBtn" onClick={this.handleAddNewClick}>Add User</Button>
                </div>
                <div className="tableContainer">
                    <Table dataSource={this.state.users} columns={columns} />;
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