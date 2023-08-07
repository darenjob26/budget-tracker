import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<div className="h-screen w-screen bg-black bg-opacity-50 fixed flex justify-center items-center">
			<Loader2 className="h-10 w-10 animate-spin" />
		</div>
	);
};

export default Loading;
