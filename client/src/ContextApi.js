// external component
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	// establish connection with socket-server
	const [mySocket, setMySocket] = useState();

	useEffect(() => {
		setMySocket(io.connect("http://localhost:4000"));
	}, []);

	// for get & set current user
	const [currentUser, setCurrentUser] = useState("");

	// for when submitted appointment, refetching data in dashboard
	const [isSubmitted, setIsSubmitted] = useState("");

	// for update notifications for advisor & student
	const [notifiUpdate, setNotifiUpdate] = useState("");

	// for update notifications for admin
	const [notifiUpdateAdmin, setNotifiUpdateAdmin] = useState("");

	return (
		<>
			<rootContext.Provider
				value={{
					mySocket,
					currentUser,
					setCurrentUser,
					isSubmitted,
					setIsSubmitted,
					notifiUpdate,
					setNotifiUpdate,
					notifiUpdateAdmin,
					setNotifiUpdateAdmin
				}}
			>
				{children}
			</rootContext.Provider>
		</>
	);
};

export const GetContextApi = () => {
	return useContext(rootContext);
};

export default ContextHandler;
