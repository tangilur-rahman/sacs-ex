// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import "./AdvisorInfo.css";

const AdvisorInfo = () => {
	const [getAdvisor, setAdvisor] = useState("");

	const getMyAdvisor = async () => {
		try {
			const response = await fetch("/my-advisor");

			const result = await response.json();

			if (response.status === 200) {
				setAdvisor(result);
			} else if (response.status === 400) {
				toast(result.message, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
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
	};

	useEffect(() => {
		getMyAdvisor();
	}, []);

	return (
		<>
			<div className="advisor-info-container">
				<div className="row m-0 layout">
					<div className="col-12 p-0">
						<div className="wrapper">
							<div className="advisor-profile">
								<span className="img-wrapper">
									<img
										src={`uploads/${getAdvisor?.profile_img}`}
										alt="profile-img"
										className="img-fluid animation"
									/>
								</span>
							</div>
							<div className="advisor-info">
								<div className="row info">
									<span id="name">
										Name : <input value={getAdvisor?.name} readOnly />
									</span>
									<span>
										ID : <input value={getAdvisor?.id} readOnly />
									</span>
									<span id="email">
										Email : <input value={getAdvisor?.email} readOnly />
									</span>
									<span id="phone-number">
										Phone : &nbsp; <h6>+880</h6>
										<input readOnly value={getAdvisor?.phone} />
									</span>
									<span>
										Gender : <input value={getAdvisor?.gender} readOnly />
									</span>
									<span>
										Department : &nbsp;
										<input
											value={getAdvisor?.department}
											readOnly
											id="department"
										/>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdvisorInfo;
