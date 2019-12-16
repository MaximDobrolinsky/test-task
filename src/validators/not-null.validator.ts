import * as _ from 'lodash';

export function NotNullValidator(fields: any) {
    _.forEach(fields, (value, key) => {
        if (!value || _.isEmpty(value)) {
            throw new Error(`${key} not provided`);
        }
    });
}
