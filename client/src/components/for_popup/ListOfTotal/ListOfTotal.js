// external components
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import "./ListOfTotal.css";

const ListOfTotal = ({ totalValue, setTotalValue, setUserEdit }) => {
	const [specificUser, setSpecificUser] = useState("");

	// for outside-click closed start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setTotalValue(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for outside-click closed end

	// for fetching specific user start
	useEffect(() => {
		if (specificUser) {
			(async () => {
				try {
					const response = await fetch(`/user/specific-user/${specificUser}`);

					const result = await response.json();

					if (response.status === 200) {
						setUserEdit(result);
						setTotalValue(false);
					} else if (result.error) {
						toast.error(result.error, {
							position: "top-right",
							theme: "colored",
							autoClose: 3000
						});
					}
				} catch (error) {
					toast.error(error.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 3000
					});
				}
			})();
		}
	}, [specificUser]);

	// for fetching specific user end

	return (
		<>
			<div
				className="container-fluid p-0 total-main-container"
				data-aos="fade-up"
				data-aos-delay="0"
			>
				<div className="row m-0 total-wrapper">
					<div ref={myRef} className="col-11 p-0 total-container">
						{/* table start  */}
						<div className="header">
							<h2>{totalValue.title}</h2>
						</div>
						<div className="table-container">
							<table className="table table-hover">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Name</th>
										<th scope="col">ID</th>
										<th scope="col">Email</th>
										<th scope="col">Gender</th>
										<th scope="col">Department</th>
										<th scope="col">Semester</th>
										<th scope="col">Aca... Year</th>
										<th scope="col">Update Date</th>
									</tr>
								</thead>

								<tbody>
									{totalValue.list &&
										totalValue.list
											.map((value, index) => {
												return (
													<tr
														key={index}
														onClick={() => setSpecificUser(value._id)}
													>
														<td id="count">{index + 1}</td>

														<td id="name">
															<img
																src={`uploads/profile-img/${value.profile_img}`}
																alt="profile-img"
																id="profile-img"
																className="img-fluid"
															/>
															<input type="text" readOnly value={value.name} />
														</td>

														<td id="id">
															<input type="text" readOnly value={value.id} />
														</td>

														<td id="email">
															<input type="text" readOnly value={value.email} />
														</td>

														<td id="gender">
															<input
																type="text"
																readOnly
																value={value.gender}
															/>
														</td>

														<td id="department">
															<input
																type="text"
																readOnly
																value={value.department}
															/>
														</td>

														<td id="semester">
															<input
																type="text"
																readOnly
																value={value.semester}
															/>
														</td>

														<td id="year">
															<input type="text" readOnly value={value.year} />
														</td>

														<td id="update-date">
															<input
																type="text"
																readOnly
																value={moment(value.updatedAt).format(
																	"DD MMM YY"
																)}
															/>
														</td>
													</tr>
												);
											})
											.reverse()}
								</tbody>
							</table>
						</div>

						{/* table end  */}
						<span className="icon" onClick={() => setTotalValue(false)}>
							<i className="fa-solid fa-circle-xmark"></i>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default ListOfTotal;
