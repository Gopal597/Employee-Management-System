class validation {
  static validate(schema) {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false, //Without this option, Joi stops at the first validation error. (//You get all errors:["Email is required", "Password must be at least 6 characters" ] This provides better feedback to API consumers.)
        stripUnknown: true, //Removes properties that are not defined in the Joi schema. (Then after validation:emoved automatically.)
      });
      if (error) {
        let errordetect = [];
        for (let err of error.details) {
          errordetect.push({
            field: err.path.join("."),
            message: err.message,
          });
        }
        return res.status(400).json({
          success: false,
          errors: errordetect,
        });
      }
      req.body = value;
      return next();
    };
  }
}

module.exports = validation;
