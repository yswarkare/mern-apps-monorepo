import User from '../models/User.js';

const getFormattedFriends = async (user) => {
	const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
	const formattedFriends = friends.map(({ _id, firstname, lastname, occupation, location, picturePath }) => ({
		_id,
		firstname,
		lastname,
		occupation,
		location,
		picturePath,
	}));
	return formattedFriends;
};

/** Read */

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(404).json(error);
	}
};

export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
		const formattedFriends = getFormattedFriends(user);
		return res.status(200).json({ friends: formattedFriends });
	} catch (error) {
		return res.status(404).json(error);
	}
};

export const addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter((id) => id !== friendId);
		} else {
			user.friends.push(friendId);
			friend.friends.push(friendId);
		}

		await user.save();
		await friend.save();

		const formattedFriends = getFormattedFriends(user);
		return res.status(200).json({ user, friend, friends: formattedFriends });
	} catch (error) {
		return res.status(404).json(error);
	}
};
