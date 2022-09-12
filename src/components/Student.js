import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Student(props) {
  const [state, setState] = useState({
    id: "",
    f_name: "",
    l_name: "",
    emailId: "",
  });

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const { studentId } = useParams(); // Get the Path Parameter from the URL
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:8080/students/${studentId}`)
        .then((response) => {
          if (response.data != null) {
            setState({
              f_name: response.data.f_name,
              l_name: response.data.l_name,
              emailId: response.data.emailId,
              id: response.data.id,
            });
          }
        })
        .catch((error) => props.showAlert("danger", "Error"));
    }
  }, []);

  const textChanged = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  let student = {
    id: state.id,
    f_name: state.f_name,
    l_name: state.l_name,
    emailId: state.emailId,
  };

  const saveStudent = (event) => {
    event.preventDefault();
    // console.log(student);

    axios
      .post("http://localhost:8080/students", student)
      .then((response) => {
        // console.log(response.data);
        if (response.data != null) {
          // props.showAlert("success", "Record added successfully");
          notify("record added successfully", false);
          setState({ id: "", f_name: "", l_name: "", emailId: "" });
        }
      })
      .catch((error) => props.showAlert("danger", "Error"));
  };

  const updateStudent = (event) => {
    event.preventDefault();
    console.log(studentId);
    axios
      .put(`http://localhost:8080/students/${studentId}`, student)
      .then((response) => {
        if (response.data != null) {
          props.showAlert("success", "Record updated successfully");
          notify("record updated successfully", false);
          navigate("/listStudents"); // Navigate to Students List Components
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="my-3">
      <Container>
        <Card>
          <Form onSubmit={studentId != null ? updateStudent : saveStudent}>
            <Card.Header>
              <strong>
                {studentId != null
                  ? "Update Student Information"
                  : "Add Student Information"}
              </strong>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  name="id"
                  value={state.id}
                  type="text"
                  placeholder="Enter id"
                  onChange={textChanged}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="f_name"
                  value={state.f_name}
                  type="text"
                  placeholder="Enter first name"
                  onChange={textChanged}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="l_name"
                  value={state.l_name}
                  type="text"
                  placeholder="Enter last name"
                  onChange={textChanged}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  name="emailId"
                  value={state.emailId}
                  type="text"
                  placeholder="Enter Email Id"
                  onChange={textChanged}
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" type="submit" onClick={notify}>
                {studentId != null ? "Update" : "Submit"}
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
