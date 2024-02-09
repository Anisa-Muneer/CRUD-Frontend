import React,{ useState} from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../Redux/User/UserSlice';
import { ProfileUpdation } from '../../Api/UserApi';




function Profile() {
  const {id,name,email,mobile,image} = useSelector(state=>state.user)
  const [photo,setPhoto] = useState(null)
  
  const dispatch = useDispatch()




  const handleSubmit = async (e) =>{
    e.preventDefault()
    const response = await ProfileUpdation(id,photo)
    console.log(response);
    if(response.data.updated){
      dispatch(setUserDetails({
        id:response.data.data._id,
        name:response.data.data.name,
        email:response.data.data.email,
        mobile:response.data.data.mobile,
        image:response.data.data.Image,
      }))
    }else{
      console.log("no response");
    }
  };

  return(
  <Container className="mt-5">
      <Card>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Image
                style={{ width: "200px", height: "200px" }}
                src={image ? `/images/${image}` : 
                "https://cdn-icons-png.flaticon.com/512/138/138659.png?w=740&t=st=1691399301~exp=1691399901~hmac=362f105791e4d80a3bb0109f64d0ca7fb46cfed6bd7afafe641b410430cb2973"}
                 // Provide a default image URL
                alt="Profile"
                fluid
                rounded
              />
            </Col>
            <Col md={8}>
            <h2>{name}</h2>
              <p>Email: {email} </p>
              <p>Mobile: {mobile} </p>
              <input type="file" accept="image/*" onChange={(e)=>{setPhoto(e.target.files[0])}} />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button  variant="primary" onClick={handleSubmit} >
                Update Profile
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      
    </Container>
  );
}

export default Profile;
