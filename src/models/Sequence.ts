import client, {q} from '../faunadb';
import schema from '../validators';
const RNA_COLLECTION = 'RNA';

class Sequence {
  type?: string;
  sequence: string;

  constructor(sequence: string, type?: string) {
    if (type) this.type = type;
    this.sequence = sequence;
  }

  toObject() {
    return {
      type: this.type,
      sequence: this.sequence,
    };
  }

  validate(): object {
    // Validate RNA sequence
    const {error} = schema.validate(this.toObject());
    if (error) {
      return {
        invalid: true,
        error,
      };
    }
    return {
      invalid: false,
    };
  }

  async save() {
    // Store the sequence in FaunaDb
    const result = await client.query(
        q.Create(q.Collection(RNA_COLLECTION), {
          data: this.toObject(),
        }),
    );
    return result;
  }
}

export default Sequence;
