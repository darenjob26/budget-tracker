interface ResponseType {
	ok: boolean;
	message: string;
	result?: any;
}

export let successMessage: ResponseType = {
	ok: true,
	message: "Success",
};

export let failedMessage: ResponseType = {
	ok: false,
	message: "Something went wrong",
};
