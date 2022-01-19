exports.convertPostDbToPost = (postDb) => {
  return {
    id: postDb._id,
    userId: postDb.id_user,
    photo: postDb.photo,
    address: {
      postalCode: postDb.address.postalCode,
      street: postDb.address.street,
      number: postDb.address.number,
      district: postDb.address.district,
      city: postDb.address.city,
    },
    description: postDb.description,
    situation: {
      lifeRisk: postDb.situation.lifeRisk,
      hurted: postDb.situation.hurted,
      identified: postDb.situation.identified,
      losted: postDb.situation.losted,
      pregnant: postDb.situation.pregnant,
      puppy: postDb.situation.puppy,
    },
    alreadySeen: postDb.alreadySeen,
    necessity: {
      rescue: postDb.necessity.rescue,
      transportation: postDb.necessity.transportation,
      temporaryHome: postDb.necessity.temporaryHome,
    },
  };
};
