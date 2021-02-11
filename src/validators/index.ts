import Joi from 'joi';

// RNA can only contain G,U,A,C
const pattern = /\b[GUAC]+\b(?![,])/;
// Type is either 0 or 1, not harmful or harmful sequence
const typePattern = /^[01]$/;

const schema = Joi.object({
  sequence: Joi.string().regex(pattern).required(),
  type: Joi.string().regex(typePattern),
});

export default schema;
