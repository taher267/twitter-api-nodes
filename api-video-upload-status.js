// id=631433a03f19ce7d5de97329
exports.twitterFileUploadTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw error(`Invalid params id`);
    const currentUser = await findUser('_id', id);
    if (!currentUser) throw error(`User not found`);
    let { token, token_secret } = currentUser;
    //check file
    let { size, mimetype, data } = req?.files?.videos;

    // try {
    let { media_id_string } = await twitApi(
      token,
      token_secret,
      'mediaUpload',
      {
        command: 'INIT',
        total_bytes: size,
        media_type: mimetype,
      }
    );
    let append = await appending(token, token_secret, media_id_string, data);
    // let append = await twitApi(token, token_secret, 'mediaUpload', {
    //   command: 'APPEND',
    //   media_id: '1570470229607862272',
    //   media: data,
    //   segment_index: 0,
    // });
    // console.log('append', append);
    let finalize = await twitApi(token, token_secret, 'mediaUpload', {
      command: 'FINALIZE',
      media_id: media_id_string,
    });
    console.log('finalize', finalize);
    
    
    
    exports.appending = async (token, token_secret, mediaId, media) => {
  try {
    return await twitApi(token, token_secret, 'mediaUpload', {
      command: 'APPEND',
      media_id: mediaId,
      media,
      segment_index: 0,
    });
  } catch (e) {
    throw error(e.message || 'errr happend');
  }
};
    let updateStatuses = await twitApi(token, token_secret, 'statusesUpdate', {
      status: 'fljdkfjskfjsdkfjd',
      media_ids: media_id_string,
    });
    console.log('updateStatuses', updateStatuses);

    res.status(200).json({ msg: 'Alhamdu lillah', currentUser: 'jfdj' });
  } catch (e) {
    // console.log(e);
    next(e);
  }
};

exports.statusesDestroy = async (req, res) => {
  try {
    const { id, id_str } = req.params;
    if (!isValidObjectId(id)) throw error(`Invalid params id`);
    const currentUser = await findUser('_id', id);
    if (!currentUser) throw error(`User not found`);
    let { token, token_secret } = currentUser;

    try {
      const deleteStatuses = await twitApi(
        token,
        token_secret,
        'statusesDestroy',
        { id: id_str }
      );
      res.status(200).json({ msg: 'Alhamdu lillah', deleteStatuses });
    } catch (err) {
      throw error(err?.[0]?.message);
    }
  } catch (e) {
    throw error(e.message);
  }
};
