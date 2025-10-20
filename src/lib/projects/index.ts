export type Project = {
	id: number;
	author: {
		id: number;
		username: string;
		displayName: string;
	};
	uploadTs: number;
	title: string;
	description: string;
	rating: ProjectRating;
	commentCount: number;
	upvotes: number;
	downvotes: number;
};

export type Comment = {
	id: number;
	content: string;
	author: {
		id: number;
		username: string;
		displayName: string;
	};
	postDate: number;
	replyTo: number;
	hasReplies: false;
};
