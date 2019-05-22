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
      render: () => <a href="javascript:;">Edit</a>,
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      width: '12%',
      render: () => <a href="javascript:;">Delete</a>,
  }
  ];

export default columns;