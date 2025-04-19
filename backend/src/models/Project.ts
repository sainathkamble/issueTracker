import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold';
  startDate: Date;
  endDate?: Date;
  team: mongoose.Types.ObjectId[];
  issues: mongoose.Types.ObjectId[];
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
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
      enum: ['active', 'completed', 'on_hold'],
      default: 'active',
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    team: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    issues: [{
      type: Schema.Types.ObjectId,
      ref: 'Issue',
    }],
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for calculating progress based on issues
projectSchema.virtual('calculatedProgress').get(function() {
  if (!this.issues || this.issues.length === 0) return 0;
  
  const resolvedIssues = this.issues.filter((issue: any) => issue.status === 'resolved');
  return (resolvedIssues.length / this.issues.length) * 100;
});

// Pre-save middleware to update progress
projectSchema.pre('save', function(next) {
  this.progress = this.calculatedProgress;
  next();
});

// Indexes for better query performance
projectSchema.index({ status: 1 });
projectSchema.index({ team: 1 });

export const Project = mongoose.model<IProject>('Project', projectSchema); 