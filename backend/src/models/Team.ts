import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  projects: mongoose.Types.ObjectId[];
  leader: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    projects: [{
      type: Schema.Types.ObjectId,
      ref: 'Project',
    }],
    leader: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
teamSchema.index({ name: 1 });
teamSchema.index({ leader: 1 });
teamSchema.index({ members: 1 });

// Virtual for team size
teamSchema.virtual('size').get(function() {
  return this.members.length;
});

// Method to add a member to the team
teamSchema.methods.addMember = async function(userId: mongoose.Types.ObjectId) {
  if (!this.members.includes(userId)) {
    this.members.push(userId);
    await this.save();
  }
  return this;
};

// Method to remove a member from the team
teamSchema.methods.removeMember = async function(userId: mongoose.Types.ObjectId) {
  this.members = this.members.filter(
    (memberId: mongoose.Types.ObjectId) => !memberId.equals(userId)
  );
  await this.save();
  return this;
};

export const Team = mongoose.model<ITeam>('Team', teamSchema); 