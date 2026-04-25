const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  repoUrl: {
    type: String,
    required: true,
  },
  language: [String],
  techStack: [String],
  stars: {
    type: Number,
    default: 0,
  },
  forks: {
    type: Number,
    default: 0,
  },
  activityLevel: {
    type: String,
    enum: ['Highest', 'High', 'Moderate', 'Low'],
    default: 'Moderate',
  },
  competitionLevel: {
    type: String,
    enum: ['Very High', 'High', 'Moderate', 'Low', 'Very Low'],
    default: 'Moderate',
  },
  topics: [String],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', projectSchema);
