import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'users',
    }, //ref: 'user'; tells Mongoose that the userId field refers to the _id field of the 'user' collection. In other words, it creates a connection between a session and a specific user.
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true }, //Extends the session
    accessTokenValidUntil: { type: Date, required: true }, //Determines how long the token is valid
    refreshTokenValidUntil: { type: Date, required: true }, //Determines how long the token is valid
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('sessions', sessionSchema);
