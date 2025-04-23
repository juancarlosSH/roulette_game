export class Api {
  /** Base URL */
  sBaseURL;

  /**
   * Api constructor
   */
  constructor() {
    this.sBaseURL = "http://localhost:3000/api/";
  }

  async _getLeaderBoard() {
    let oReponse = null;
    try {
      oReponse = await fetch(this.sBaseURL + "games/leaderboard");
      if (!oReponse.ok) {
        throw new Error("Failed to fetch high scores");
      }
    } catch (oError) {
      console.log(oError);
    } finally {
      return oReponse;
    }
  }
}
