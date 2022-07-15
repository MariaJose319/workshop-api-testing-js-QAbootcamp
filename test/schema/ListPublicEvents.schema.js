const listPublicEventsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      type: { type: 'string' },
      actor: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          login: { type: 'string' },
          display_login: { type: 'string' },
          gravatar_id: { type: 'string' },
          url: { type: 'string' },
          avatar_url: { type: 'string' }
        }
      },
      repo: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          url: { type: 'string' }
        }
      },
      payload: {
        type: 'object',
        properties: {
          push_id: { type: 'integer' },
          size: { type: 'integer' },
          distinct_size: { type: 'integer' },
          ref: { type: ['string', 'null'] },
          head: { type: 'string' },
          before: { type: 'string' },
          commits: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                sha: { type: 'string' },
                message: { type: 'string' },
                distinct: { type: 'boolean' },
                url: { type: 'string' },
                author: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    name: { type: 'string' }
                  }
                }
              }
            }
          }
        },
        public: { type: 'boolean' },
        created_at: { type: 'string' }
      }
    }
  }
};

exports.listPublicEventsSchema = listPublicEventsSchema;
