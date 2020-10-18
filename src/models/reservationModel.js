export default (mongoose) => {
  const schema = mongoose.Schema({
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    idDriver: {
      type: String,
      required: true,
    },
    idCar: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    driver: {
      type: Object,
      required: false,
    },
    car: {
      type: Object,
      required: false,
    },
  });

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
  });

  const reservationModel = mongoose.model('reservation', schema, 'reservation');

  return reservationModel;
};
