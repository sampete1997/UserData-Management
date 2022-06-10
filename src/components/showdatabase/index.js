import 'antd/dist/antd.css'
import './style.css'

import { Button, Table, Modal, Input } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axiosConn from '../../webApiConfig';

// require('dotenv').config()



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
  const updateRedux = useSelector((state) => state.showData.updateRedux);
  const [number, SetNumber] = useState('')
  const [FileName, SetFileName] = useState('')


  const [err, SetErr] = useState('')
  const [success, SetSuccess] = useState('')
  const [userPic, SetUserPic] = useState('')
  const [nameErr, SetNameError] = useState('')
  const [ageErr, SetAgeError] = useState('')
  const [mobileNoErr, SetMobileNoError] = useState('')
  const [emailErr, SetEmailError] = useState('')
  const [photoErr, SetPhotoError] = useState('')

  useEffect(() => {

    axiosConn.get(`/api/showdb`).then((responseData) => {

      let newData = responseData.data

      console.log('updateRedux', updateRedux);

      return dispatch({ type: 'ShowUserData', payload: newData })

    }).catch(err => {

      console.log(err)
    })

  }, [isEditing, updateRedux])

  function allow(mobileNum) {

    axiosConn.put('/api/allowance', {

      flag: 'true',
      mobileNo: mobileNum

    }).then(() => {

      dispatch({ type: 'updateRedux' })

    })

  }

  function disAllow(mobileNum) {

    axiosConn.put('/api/allowance', {
      flag: 'false',
      mobileNo: mobileNum
    }).then(() => {

      dispatch({ type: 'updateRedux' })



    }).catch((err) => {
      console.log(err)
    })

  }

  function updateData() {

    const formData = new FormData();

    SetErr('')
    SetSuccess('')
    SetNameError('')
    SetAgeError('')
    SetMobileNoError('')
    SetEmailError('')
    SetPhotoError('')

    formData.append("image", userPhoto);
    formData.append("mobileNum", number);
    formData.append("name", userName);
    formData.append("age", userAge);
    formData.append("mobileNo", userMobileNo);
    formData.append("email", userEmail);
    formData.append("photo", userPhoto.name || FileName);

    console.log('formdta', formData);

    axiosConn.put("/api/edit", formData).then((response) => {




      SetPhotoError('')
      SetSuccess('Changes has saved')
      dispatch({ type: 'updateRedux' })
      setTimeout(() => {
        dispatch({ type: 'isEditing', isEditing: false });


      }, 1000)
      
   


    }).catch((err) => {

      if (err.response.data.Message) {

        SetPhotoError(err.response.data.Message)
      }

      let errors = err.response.data.message.details
      errors.map((errMsg) => {

        console.log('errmsg', errMsg);


        if ((errMsg.message).includes('name')) {
          SetNameError(errMsg.message)
        }
        if ((errMsg.message).includes('"age"')) {
          SetAgeError(errMsg.message)
        }
        if ((errMsg.message).includes('mobileNo')) {
          SetMobileNoError(errMsg.message)
        }
        if ((errMsg.message).includes('email')) {
          if (userEmail === '') {

            SetEmailError('email is required')
          }
          else {

            SetEmailError('email id must be valid email')
          }
        }
        if ((errMsg.message).includes('image')) {
          SetPhotoError('please add image')
        }

      })

    })
  }

  async function addNewUserData() {

    const formData = new FormData();

    SetErr('')
    SetSuccess('')
    SetNameError('')
    SetAgeError('')
    SetMobileNoError('')
    SetEmailError('')
    SetPhotoError('')


    if (userName === '' || userAge === '' || userMobileNo === '' || userEmail === '' || userPhoto === '') {

      SetErr('all the input fields are required')

    }
    else {


      formData.append("image", userPhoto);
      formData.append("name", userName);
      formData.append("age", userAge);
      formData.append("mobileNo", userMobileNo);
      formData.append("email", userEmail);
      formData.append("photo", userPhoto.name);
      formData.append("flag", 'false');
      formData.append("isAdmin", 'false');
      console.log('formdata', formData);

      axiosConn.post("/api/addUser", formData


        // name: userName,
        // age: userAge,
        // mobileNo: userMobileNo,
        // email: userEmail,
        // photo: userPhoto,
        // flag: "false",
        // isAdmin: "false"

      ).then((response) => {

        if (response.data.length > 0) {

          SetErr('Sorry email or mobile no. already exist')

        }

        else {
          SetSuccess('Added user succussfully')
          dispatch({ type: 'updateRedux' })
          console.log('updateRedux', updateRedux);


          setTimeout(() => {
            dispatch({ type: 'isAdd', isAdd: false })


          }, 1000)


        }


      }).catch(err => {

        if (err.response.data.Message) {

          SetPhotoError(err.response.data.Message)
        }

        let errors = err.response.data.message.details
        errors.map((errMsg) => {

          console.log('errmsg', errMsg);


          if ((errMsg.message).includes('name')) {
            SetNameError(errMsg.message)
          }
          if ((errMsg.message).includes('age')) {
            SetAgeError(errMsg.message)
          }
          if ((errMsg.message).includes('mobileNo')) {
            SetMobileNoError(errMsg.message)
          }
          if ((errMsg.message).includes('email')) {
            SetEmailError(errMsg.message)
          }

        })

        console.log('add user err', err.response.data.message.details)

      })


    }
  }

  function deleteUser(userNum, userMail) {

    axiosConn.post('/api/delete', {

      mobileNo: userNum,
      email: userMail
    }).then((response) => {

      dispatch({ type: 'updateRedux' })

    }).catch(err => {
      console.log(err)
    })
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

            <button className='permissionbtn' onClick={() => {

              return allow(record.mobileNo)
            }
            }>✅</button>

            <button className='permissionbtn' onClick={() => {

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
      title: "Are you sure, you want to delete this user record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {

        deleteUser(record.mobileNo, record.email)

      },
    });
  };
  function onEditUser(record) {

    SetErr('')
    SetSuccess('')
    SetNameError('')
    SetAgeError('')
    SetMobileNoError('')
    SetEmailError('')
    SetPhotoError('')

    console.log('clicked record', record);
    SetNumber(record.mobileNo)
    dispatch({ type: 'isEditing', isEditing: true })

    dispatch({ type: 'updateRedux' })
    dispatch({ type: 'addName', name: record.name })
    dispatch({ type: 'addAge', age: record.age })
    dispatch({ type: 'addMobileNo', mobileNo: record.mobileNo })
    dispatch({ type: 'addEmail', email: record.email })

    SetFileName(record.photo)

    SetUserPic(String(process.env.REACT_APP_URL) + '/images/' + record.photo)



  };
  const resetEditing = () => {


    dispatch({ type: 'isAdd', isAdd: false })
    dispatch({ type: 'addName', name: '' })
    dispatch({ type: 'addAge', age: '' })
    dispatch({ type: 'addMobileNo', mobileNo: '' })
    dispatch({ type: 'addEmail', email: '' })
    dispatch({ type: 'addPhoto', photo: '' })
    dispatch({ type: 'isEditing', isEditing: false });

    SetErr('')
    SetSuccess('')
    SetNameError('')
    SetAgeError('')
    SetMobileNoError('')
    SetEmailError('')
    SetPhotoError('')

  };
  return (
    <div className="App">
      <header className="App-header">
        <div className='adduserbtn'>Add User<PlusOutlined className='PlusOutlined' onClick={() => onAddUser()}></PlusOutlined> </div>
        <Table columns={columns} dataSource={UserData}></Table>
        <Modal
          title="User Details"
          visible={isEditing || isAdd}
          okText="Save"
          onCancel={() => {

            resetEditing();
            SetNumber('')
            SetFileName('')
            SetUserPic('')
          }}
          onOk={() => {


            if (isEditing) {

              updateData();

            }
            if (isAdd) {
              addNewUserData();

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
          {nameErr ? <p className='err'>{nameErr}</p> : <p></p>}
          <Input
            placeholder='age'
            type={'number'}
            value={userAge}
            onChange={(e) => {
              return dispatch({ type: 'addAge', age: e.target.value })
            }}
          />
          {ageErr ? <p className='err'>{ageErr}</p> : <p></p>}
          <Input
            placeholder='mobile number'
            type={'number'}
            value={userMobileNo}
            onChange={(e) => {
              return dispatch({ type: 'addMobileNo', mobileNo: e.target.value })
            }}
          />
          {mobileNoErr ? <p className='err'>{mobileNoErr}</p> : <p></p>}
          <Input
            placeholder='email'
            value={userEmail}
            onChange={(e) => {
              return dispatch({ type: 'addEmail', email: e.target.value })
            }}
          />
          {emailErr ? <p className='err'>{emailErr}</p> : <p></p>}
          <Input
            type='file'
            placeholder='Photo'
            onChange={(e) => {
              return dispatch({ type: 'addPhoto', photo: e.target.files[0] })
            }}
          />
          {photoErr ? <p className='err'>{photoErr}</p> : <p></p>}

          {success ? <p className='success'>{success} </p> : <p className='err'>{err}</p>}

          {userPic ? <img id="userImg" src={userPic} height={150} width={150} ></img> : ''}
        </Modal>
      </header>
    </div>
  )
}