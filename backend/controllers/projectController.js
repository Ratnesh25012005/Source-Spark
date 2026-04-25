const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const { language, techStack, activityLevel, competitionLevel, search, page = 1, limit = 12 } = req.query;
    const query = {};

    if (language) {
      const languages = Array.isArray(language) ? language : `${language}`.split(',');
      query.language = { $in: languages };
    }

    if (techStack) {
      const stacks = Array.isArray(techStack) ? techStack : `${techStack}`.split(',');
      query.techStack = { $in: stacks };
    }

    if (activityLevel) {
      query.activityLevel = activityLevel;
    }

    if (competitionLevel) {
      query.competitionLevel = competitionLevel;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { topics: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 12;
    const skip = (parsedPage - 1) * parsedLimit;

    const [projects, total] = await Promise.all([
      Project.find(query).sort({ stars: -1, lastUpdated: -1 }).skip(skip).limit(parsedLimit),
      Project.countDocuments(query),
    ]);

    res.json({
      projects,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load projects', error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load project', error: error.message });
  }
};
