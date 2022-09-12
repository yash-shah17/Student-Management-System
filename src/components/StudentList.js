import React, { useEffect, useState } from "react";
import { Card, Container, Table, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentList(props) {
  const [students, setStudents] = useState([]);

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

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    axios
      .get("http://localhost:8080/students")
      .then((response) => setStudents(response.data))
      .catch((error) => alert(error));
  };

  let deleteStudent = (studentId) => {
    axios
      .delete(`http://localhost:8080/students/${studentId}`)
      .then((response) => {
        if (response.data !== null) {
          props.showAlert("success", "Record deleted successfully");
          notify("student record deleted successfully");
          setStudents(students.filter((student) => student.id !== studentId));
        }
      });
  };

  return (
    <div className="my-3">
      <Container>
        <Card.Header>
          <h3>Students List</h3>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student Id</th>
                <th>Student F_Name</th>
                <th>Student L_Name</th>
                <th>Student EmailId</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={3}>{students.length} Studnets Available!!!</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.f_name}</td>
                    <td>{student.l_name}</td>
                    <td>{student.emailId}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={"/student/" + student.id}>
                          <Button size="sm" variant="outline-primary">
                            <FontAwesomeIcon icon={faEdit}>
                              Edit
                            </FontAwesomeIcon>
                          </Button>
                        </Link>

                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={deleteStudent.bind(this, student.id)}
                        >
                          <FontAwesomeIcon icon={faTrash}>
                            Delete
                          </FontAwesomeIcon>
                        </Button>

                        {/* <Button size="sm" variant="outline-danger" onClick={()=>deleteStudent(student.id)}><FontAwesomeIcon icon={faTrash}> Delete </FontAwesomeIcon></Button> */}
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
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
