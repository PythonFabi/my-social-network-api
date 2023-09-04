const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .select('-__v');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
              .populate('thoughts');

              if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }

              res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body.userId }},
                { runValidators: true, new: true }
            );
            
            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndRemove({ _id: req.params.friendId });

            if (!friend) {
                return res.status(404).json({ message: 'No friend with that id!'})
            }

            const user = await User.findOneAndUpdate(
                { friends: req.params.friendId },
                { $pull: { friends: req.params.friendId }},
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID '});
            }

            res.json({ message: 'Friend successfully removed!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};