import 'antd/dist/antd.css'
import './style.css'

import { Button, Table, Modal, Input} from "antd";

import { SearchOutlined } from "@ant-design/icons";

import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axiosConn from '../../webApiConfig';


export default function ShowUserData() {

  const dispatch = useDispatch()
  const UserData = useSelector((state) => state.showData.userData);

  const userName = useSelector((state) => state.addUser.name);
  const userAge = useSelector((state) => state.addUser.age)
  const userMobileNo = useSelector((state) => state.addUser.mobileNo);
  const userEmail = useSelector((state) => state.addUser.email);
  const userPhoto = useSelector((state) => state.addUser.photo);
  const isEditing = useSelector((state) => state.showData.isEditing);
  const isAdd = useSelector((state) => state.addUser.isAdd);
  const changeFlag = useSelector((state) => state.showData.flag);
  const [number, SetNumber] = useState('')




  useEffect(() => {
    console.log('port',process.env.REACT_APP_BASE_URL_LOCAL);

    axiosConn.get(`/api/showdb`).then((responseData) => {
      let newData = responseData.data
      console.log('run',newData);
      return dispatch({ type: 'ShowUserData', payload: newData })

    }).catch(err=>console.log(err))

  },[isEditing,changeFlag])

  function allow(mobileN) {

    axiosConn.put('/api/allow', {

      mobileNo: mobileN

    }).then(() => {

      dispatch({ type: 'changeFlag', payload: 'up' })
      console.log('flag change', changeFlag);
    })

  }

  function disAllow(mobileN) {

    axiosConn.put('/api/disAllow', {

      mobileNo: mobileN
    }).then(() => {

      dispatch({ type: 'changeFlag', payload: 'down' })
      console.log('flag change', changeFlag);


    })

  }

  function updateData() {

    axiosConn.put('/api/edit' ,{

      mobileNum: number,
      name: userName,
      age: userAge,
      mobileNo: userMobileNo,
      email: userEmail,
      photo: userPhoto,

    }).then((response)=>{

      dispatch({ type: 'changeFlag', payload: 'up' })
      dispatch({ type: 'changeFlag', payload: 'down' })
    }).catch(err=>console.log(err))


  }

  function addNewUserData() {


    let Allow = true

    if (userName === '' || userAge === '' || userMobileNo === '' || userEmail === '' || userPhoto === '') {

      Allow = false
      alert('Fill all input fields')

    }
    else {

      UserData.forEach((currUser, indx) => {

        if (currUser.email === userEmail|| currUser.mobileNo === userMobileNo ) {

          Allow = false

        }
      })

      if (Allow) {
        axiosConn.post('/api/addUser', {


          name: userName,
          age: userAge,
          mobileNo: userMobileNo,
          email: userEmail,
          photo: userPhoto,
          flag: "false",
          isAdmin:"false"

        }).then((response)=>{

          dispatch({ type: 'changeFlag', payload: 'up' })
          dispatch({ type: 'changeFlag', payload: 'down' })
        }).catch(err=>console.log(err.message))
      }
      else {
        alert('user mobile number or email already exist ')
      }

    }
  }

  function deleteUser(userNum) {

    axiosConn.post('/api/delete', {

      mobileNo: userNum
    }).then((response)=>{

      dispatch({ type: 'changeFlag', payload: 'up' })
      dispatch({ type: 'changeFlag', payload: 'down' })
    }).catch(err=>console.log(err.message))
  }

  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {


        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "2",
      title: "Age",
      dataIndex: "age",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.age === Number(value);
      },
    },
    {
      key: "3",
      title: "Mobile No",
      dataIndex: "mobileNo",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.mobileNo.includes(value);
      }
    },
    {
      key: "4",
      title: "Email",
      dataIndex: "email",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.email.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "5",
      title: "Photo",
      dataIndex: "photo",
    },

    {
      key: "6",
      title: "Approval",
      dataIndex: "flag",
      filters: [
        { text: 'true', value: 'true' },
        { text: 'false', value: 'false' }
      ],
      onFilter: (value, record) => {
        console.log('val', value, record.flag);
        return record.flag === value
      }
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>

            <EditOutlined
              onClick={() => {
                onEditUser(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteUser(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />

            <button className='permisiionbtn' onClick={() => {

              return allow(record.mobileNo)
            }
            }>✅</button>

            <button className='permisiionbtn' onClick={() => {

              return disAllow(record.mobileNo)
            }
            }>❌</button>
          </>
        );
      },
    },
  ];

  const onAddUser = () => {

    dispatch({ type: 'isAdd', isAdd: true })

  }

  const onDeleteUser = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {

        deleteUser(record.mobileNo)
        console.log('delete', record.mobileNo);
      },
    });
  };
  function onEditUser(record) {
    console.log('clicked record', record);
    SetNumber(record.mobileNo)
    dispatch({ type: 'isEditing', isEditing: true })
    console.log('isediting', isEditing);
    dispatch({ type: 'changeFlag', payload: 'up' })
    dispatch({ type: 'addName', name: record.name })
    dispatch({ type: 'addAge', age: record.age })
    dispatch({ type: 'addMobileNo', mobileNo: record.mobileNo })
    dispatch({ type: 'addEmail', email: record.email })
    dispatch({ type: 'addPhoto', photo: record.photo })
  };
  const resetEditing = () => {

   
    dispatch({ type: 'isAdd', isAdd: false })
    dispatch({ type: 'addName', name: '' })
    dispatch({ type: 'addAge', age: '' })
    dispatch({ type: 'addMobileNo', mobileNo: '' })
    dispatch({ type: 'addEmail', email: '' })
    dispatch({ type: 'addPhoto', photo: '' })

    dispatch({ type: 'isEditing', isEditing: false });

  };
  return (
    <div className="App">
      <header className="App-header">
        <div className='adduserbtn'>Add User<PlusOutlined className='PlusOutlined' onClick={() => onAddUser()}></PlusOutlined> </div>
        <Table columns={columns} dataSource={UserData}></Table>
        <Modal
          title="Edit Student"
          visible={isEditing || isAdd}
          okText="Save"
          onCancel={() => {

            resetEditing();
            SetNumber('')
          }}
          onOk={() => {


            if (isEditing) {
              
              updateData();
              resetEditing();
              

            }
            if (isAdd) {

              addNewUserData();
              resetEditing();
              

            }
          }}
        >
          <Input
            placeholder='name'
            value={userName}
            onChange={(e) => {
              return dispatch({ type: 'addName', name: e.target.value })
            }}
          />
          <Input
            placeholder='age'
            value={userAge}
            onChange={(e) => {
              return dispatch({ type: 'addAge', age: e.target.value })
            }}
          />
          <Input
            placeholder='mobile number'
            value={userMobileNo}
            onChange={(e) => {
              return dispatch({ type: 'addMobileNo', mobileNo: e.target.value })
            }}
          />
          <Input
            placeholder='email'
            value={userEmail}
            onChange={(e) => {
              return dispatch({ type: 'addEmail', email: e.target.value })
            }}
          />
          <Input
            placeholder='Photo'
            value={userPhoto}
            onChange={(e) => {
              return dispatch({ type: 'addPhoto', photo: e.target.value })
            }}
          />
        </Modal>
      </header>
    </div>
  )
}