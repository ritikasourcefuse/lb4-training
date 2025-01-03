// Copyright IBM Corp. and LoopBack contributors 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

export interface User {
  id: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
