const { Schema, Types } = require('mongoose');
const { format } = require('date-fns');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

reactionSchema.path('createdAt').get(function (timestamp) {
    return format(timestamp, "do MMMM, yyyy 'at' h:mmaa");
});

module.exports = reactionSchema;