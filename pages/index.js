import { PageHeader, Button, Table, Modal } from 'antd';
import "../app.sass";
import columns from '../config/user-column-config';

const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

export default class Home extends React.Component {
    
    state = { visible: false };

    handleClick = () => {
        this.toggleModal(true);
    }

    handleModalOk = () => {
        this.toggleModal(false);
    }

    handleModalCancel = () => {
        this.toggleModal(false);
    }

    toggleModal(flag) {
        this.setState({
            visible: flag,
          });
    }

    render() {
        return (
            <div>
                <PageHeader className="header">Users</PageHeader>
                <div className="addNewBtnContainer">
                    <Button className="addNewBtn" onClick={this.handleClick}>Add User</Button>
                </div>
                <Table dataSource={dataSource} columns={columns} />;
                <Modal
                  title="Basic Modal"
                  visible={this.state.visible}
                  onOk={this.handleModalOk}
                  onCancel={this.handleModalCancel}
                >
                    <input />
                    <input />
                </Modal>
            </div>
        );
    }
}
