/* tslint:disable:variable-name */

import { TFClassesTracker }                                           from './TFClassesTracker';
import { PunishmentData, PunishmentType }                             from './Punishment';
import db                                                             from '../database/db';
import {
  addRoleQuery,
  removeRoleQuery,
  setLeagueAdminStatusQuery,
  setStaffRoleQuery,
} from '../database/queries/player';
import logger                                                         from '../modules/logger';
import { Role, StaffRole }                                            from './Roles';
import { removePlayer }                                               from '../modules/playerMap';

/**
 * Describes a Player.
 * @typedef Player
 * @property {string} steamid - The player's SteamID.
 * @property {URL} avatar - The link to the player's Steam avatar
 * @property {string} alias - The Player's unique custom alias on the site.
 * @property {number} pugs - The number of pugs the player has played.
 * @property {number} wins - The number of pugs the player has won.
 * @property {number} losses - The number of pugs the player has lost.
 * @property {Role[]} roles - The player's stackable roles
 * @property {boolean} isCaptain - Whether or not the player is qualified to be a captain.
 * @property {TFClassesTracker} winsByClass - A {@link TFClassesTracker} object that maps the
 *     amount of pugs the Player has won to each class.
 * @property {TFClassesTracker} lossesByClass - A {@link TFClassesTracker} object that maps the
 *     amount of pugs the Player has lost to each class.
 */
export class Player {
  get isLeagueAdmin(): boolean {
    return this._isLeagueAdmin;
  }

  get staffRole(): StaffRole | false {
    return this._staffRole;
  }
  get roles(): Role[] {
    return this._roles;
  }
  steamid: string;
  sessionid: string;
  alias: string                   = undefined;
  avatar: string;
  pugs: number                    = 0;
  totalWins: number               = 0;
  losses: number                  = 0;
  isCaptain: boolean              = false;
  private _isLeagueAdmin: boolean = false;
  private _roles: Role[]          = [];
  private _staffRole: StaffRole | false = false;
  winsByClass: TFClassesTracker;
  lossesByClass: TFClassesTracker;
  activePunishments: Map<PunishmentType, PunishmentData>;

  /**
   * Creates a new Player object.
   * @param {string} steamid - The Player's SteamID
   * @param {URL} avatar - The link to the Player'announcements Steam avatar.
   * @param {string} alias The Player's unique custom alias on the site
   */
  constructor(steamid: string, avatar: string, alias?: string) {
    this.steamid = steamid;
    this.avatar = avatar;
    this.alias = alias || undefined;
    this.winsByClass = new TFClassesTracker();
    this.lossesByClass = new TFClassesTracker();
    this._staffRole = false;
    this._roles = [];
    this._isLeagueAdmin = false;
    this.activePunishments
        = new Map<PunishmentType, PunishmentData>();
  }
  async addRole(role: Role): Promise<void> {
    if (this._roles.indexOf(role) !== -1) {
      logger.warn(`${this.alias} is already ${role}`);
    } else {
      await db.query(removeRoleQuery, [role, this.steamid]);
      await db.query(addRoleQuery, [role, this.steamid]);
      this._roles.push(role);
    }
  }

  async setStaffRole(role: StaffRole | false): Promise<void> {
    if (role === this.staffRole) {
      logger.warn(`${this.alias} is already ${role}`);
    } else {
      await db.query(setStaffRoleQuery, [role, this.steamid]);
      this._staffRole = role;
    }
  }

  async setLeagueAdminStatus(status: boolean) {
    if (this._isLeagueAdmin === status) {
      logger.warn(`${this.alias}'s league admin status is already ${status}`);
    } else {
      await db.query(setLeagueAdminStatusQuery, [status, this.steamid]);
      this._isLeagueAdmin = status;
    }
  }

  async updateRoles(roles: Role[], staffRole: StaffRole, isLeagueAdmin: boolean) {
//    const staffRoles = ['mod', 'admin', 'headAdmin'];
//    const staffRole = roles.filter(x => staffRoles.find(roles));
//
//    const query = {
//      text: ``,
//    };
    return;
  }

  async removeRole(role: Role | StaffRole | 'isLeagueAdmin') {

  }

  async removeAllRoles() {

  }
}
