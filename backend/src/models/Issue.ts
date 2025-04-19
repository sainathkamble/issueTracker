import mongoose, { Document, Schema } from 'mongoose';

export interface IIssue extends Document {
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  project: mongoose.Types.ObjectId;
  assignee: mongoose.Types.ObjectId;
  reporter: mongoose.Types.ObjectId;
  labels: string[];
  comments: {
    user: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const issueSchema = new Schema<IIssue>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    labels: [{
      type: String,
      trim: true,
    }],
    comments: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
issueSchema.index({ project: 1, status: 1 });
issueSchema.index({ assignee: 1, status: 1 });
issueSchema.index({ reporter: 1 });

export const Issue = mongoose.model<IIssue>('Issue', issueSchema); 