import { knex } from 'knex';
import 'dotenv/config';
import config from '../../databases/knex/knexfile'

const knexInstance = knex(config.development);

export default knexInstance;