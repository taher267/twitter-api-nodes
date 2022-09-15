exports.twitterFileUploadTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw error(`Invalid params id`);
    const currentUser = await findUser('_id', id);
    if (!currentUser) throw error(`User not found`);
    let { token, token_secret } = currentUser;
    //check file
    let imageFile = req?.files?.images?.data;
    let { media_id_string } = await twitApi(
      token,
      token_secret,
      'mediaUpload',
      {
        media: imageFile,
      }
    );

    try {
      const status = {
        status: pseudoRandomBytes(32).toString('binary'),
        media_ids: media_id_string,
        // media_ids: uploadOne.media_id_string,
      };
      const statusesUpdate = await twitApi(
        token,
        token_secret,
        'statusesUpdate',
        status
      );
      console.log(statusesUpdate);
    } catch (er) {
      console.log(er);
    }

    res.status(200).json({ msg: 'Alhamdu lillah', currentUser: 'jfdj' });
  } catch (e) {
    next(e);
  }
};
