import React from "react";
import { Container, Row, Form, FormGroup, FormControl, FormLabel, Button, Alert, Table } from "react-bootstrap";
import './Formdb.css';

class Formdb extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			location: "",
			phone: "",
			gender: "Nam",
			position: "",
			records: [],
			showAlert: false,
			alertMsg: "",
			alertType: "success",
			id: "",
			update: false,
		};
	}

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	};
	// Ham de hien thi du lieu ra giao dien
	componentWillMount() {
		this.fetchAllRecords();
	}


	// add a record
	addRecord = () => {
		if (this.state.name === '' || this.state.location === '' || this.state.phone === '' || this.state.position === '') {
			this.setState({
				showAlert: true,
				alertMsg:  "Fields are mandatory",
				alertType: "error",
			})
			return;
		}

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var body = JSON.stringify({ name: this.state.name, location: this.state.location, phone: this.state.phone, gender: this.state.gender, position: this.state.position });

		fetch("http://localhost:8000/api/create", {
			method: "POST",
			headers: myHeaders,
			body: body,
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				this.setState({
					name: "",
					location: "",
					phone: "",
					gender: "Nam",
					position: "",
					showAlert: true,
					alertMsg: result.response,
					alertType: "success",
				});
			});

	};

	// fetch All Records
	fetchAllRecords = () => {
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		fetch("http://localhost:8000/api/view", {
			method: "GET",
			headers: headers,
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("result", result);
				this.setState({
					records: result.response,
				});
			})
			.catch((error) => console.log("error", error));
	};

	// view single data to edit
	editRecord = (id) => {
		fetch("http://localhost:8000/api/view/" + id, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				this.setState({
					id: id,
					update: true,
					name: result.response[0].name,
					location: result.response[0].location,
					phone: result.response[0].phone,
					gender: result.response[0].gender,
					position: result.response[0].position,
				});
			})
			.catch((error) => console.log("error", error));
	};

	// update record
	updateRecord = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var body = JSON.stringify({ id: this.state.id, name: this.state.name, location: this.state.location, phone: this.state.phone, gender: this.state.gender, position: this.state.position });
		fetch("http://localhost:8000/api/update", {
			method: "PUT",
			headers: myHeaders,
			body: body,
		})
			.then((response) => response.json())
			.then((result) => {
				this.setState({
					showAlert: true,
					alertMsg: result.response,
					alertType: "success",
					update: false,
					id: "",
					name: "",
					location: "",
					phone: "",
					gender: "Nam",
					position: "",
					null: false,
				});
				this.fetchAllRecords();
			})
			.catch((error) => console.log("error", error));
	};

	// delete a record
	deleteRecord = (id) => {
		fetch("http://localhost:8000/api/delete/" + id, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((result) => {
				this.setState({
					showAlert: true,
					alertMsg: result.response,
					alertType: "danger",
				});
				this.fetchAllRecords();
			})
			.catch((error) => console.log("error", error));
	};
	render() {
		return (

			<div>

				<Container>
					<h3>Create and edit users</h3>
					{/* Insert Form */}
					<Row>
						<Form>
							<table>
								<tr>
									<td>
										<label>Enter the name:</label>
										<input class="form-control" type="text" name="name" placeholder="Enter the name" required value={this.state.name} onChange={this.handleChange}></input>

									</td>
									<td>

										<label>Enter the Location:</label>
										<input class="form-control" type="text" name="location" placeholder="Enter the Location" required value={this.state.location} onChange={this.handleChange} ></input>

									</td>
									<td>

										<label>Enter the Phone:</label>
										<input class="form-control" type="text" name="phone" placeholder="Enter the phone" required value={this.state.phone} onChange={this.handleChange} ></input>

									</td>
									<td>

										<label>Enter the Gender:</label>
										<select className="form-control1" name="gender" value={this.state.gender} onChange={this.handleChange}>
											<option value="Nu">Nu</option>
											<option value="Nam">Nam</option>
										</select>
									</td>
									<td>

										<label>Enter the Position:</label>
										<input class="form-control" type="text" name="position" placeholder="Enter the position" required value={this.state.position} onChange={this.handleChange} ></input>

									</td>
								</tr>
								<br></br>
								<tr>
									{this.state.update === true ? <Button type="submit" class="btn btn-primary" onClick={this.updateRecord}>update</Button> : <Button type="submit" class="btn btn-primary" onClick={this.addRecord}>Save</Button>}
								</tr>
							</table>
						</Form>
					</Row>

					<h1>Form</h1>

					{this.state.showAlert === true ? (
						<Alert
							variant={this.state.alertType}
							onClose={() => {
								this.setState({
									showAlert: false,
								});
							}}
							dismissible
						>
							<Alert.Heading>{this.state.alertMsg}</Alert.Heading>
						</Alert>
					) : null}

					{/* All Records */}
					<Row>
						<Table striped bordered hover size="1" >
							<thead>
								<tr>
									<th>id</th>
									<th>Name</th>
									<th>Location</th>
									<th>Phone</th>
									<th>Gender</th>
									<th>Position</th>
									<th colSpan="2">Actions</th>
								</tr>
							</thead>
							<tbody>
								{this.state.records.map((record) => {
									return (
										<tr>
											<td>{record.id}</td>
											<td>{record.name}</td>
											<td>{record.location}</td>
											<td>{record.phone}</td>
											<td>{record.gender}</td>
											<td>{record.position}</td>
											<td>
												<Button variant="info" onClick={() => this.editRecord(record.id)}>
													Edit
												</Button>
											</td>
											<td>
												<Button variant="danger" onClick={() => this.deleteRecord(record.id)}>
													Delete
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Row>

				</Container>
			</div>
		);
	}
}

export default Formdb;
