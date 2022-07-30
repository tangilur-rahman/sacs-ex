// external components

// internal components
import { d_user } from "../../../../dummy_data";
import "./UserBox.css";

const UserBox = () => {
	return (
		<>
			<div className="user-box">
				<div className="search">
					<i className="bi bi-search-heart"></i>
					<input
						type="search"
						name="search"
						id="search"
						autoComplete="off"
						placeholder="Search or start new chat"
					/>
				</div>

				{d_user &&
					d_user.map((value, index) => {
						return (
							<div className="user" key={index}>
								<img
									src={value.img}
									alt="profile-img"
									className="profile-img img-fluid"
								/>

								<section>
									<div className="above">
										<h6>{value.name}</h6>
										<span>{value.time}</span>
									</div>

									<div className="down">{value.last_message}</div>
								</section>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default UserBox;
