import { Api } from "../../utils/api";

export class LeaderboardView {
  constructor() {}

  _render() {
    const elContainer = document.createElement("div");
    elContainer.classList.add("text-center");

    const elHeading = document.createElement("h1");
    elHeading.classList.add("mb-4");
    elHeading.textContent = "🏆 High Scores";
    elContainer.appendChild(elHeading);

    const elParagraph = document.createElement("p");
    elParagraph.textContent = "These are the players with the highest scores.";
    elContainer.appendChild(elParagraph);

    const elListGroup = document.createElement("ul");
    elListGroup.classList.add("list-group", "mx-auto", "mb-4");
    elListGroup.style.maxWidth = "400px";

    const aScores = this._getLeaderboardData();
    if (Array.isArray(aScores) && aScores.length > 0) {
      for (let iIndex = 0; iIndex < aScores.length; iIndex++) {
        const oScore = aScores[iIndex];
        elListGroup.appendChild(this._createRanking(iIndex, oScore));
      }
    } else {
      const elNoDataItem = document.createElement("li");
      elNoDataItem.classList.add("list-group-item", "text-warning");
      elNoDataItem.textContent = "No high scores available.";
      elListGroup.appendChild(elNoDataItem);
    }

    elContainer.appendChild(elListGroup);
    return elContainer;
  }

  _getLeaderboardData() {
    const oApi = new Api();
    return oApi._getLeaderBoard();
  }

  _createRanking(iIndex, oScore) {
    const elListItem = document.createElement("li");
    elListItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    let sRankText = `${iIndex + 1}°`;
    let sMedal = "";

    switch (iIndex) {
      case 0:
        sMedal = "🥇";
        elListItem.style.backgroundColor = "#ffd70033";
        break;
      case 1:
        sMedal = "🥈";
        elListItem.style.backgroundColor = "#c0c0c033";
        break;
      case 2:
        sMedal = "🥉";
        elListItem.style.backgroundColor = "#cd7f3233";
        break;
    }

    const elRank = document.createElement("span");
    elRank.textContent = `${sMedal} ${sRankText} ${oScore.name}`;
    elListItem.appendChild(elRank);

    const elScoreContainer = document.createElement("span");

    const elScore = document.createElement("strong");
    elScore.textContent = `${oScore.top_score}`;
    elScoreContainer.appendChild(elScore);

    const elScoreText = document.createElement("span");
    elScoreText.textContent = " pts";
    elScoreContainer.appendChild(elScoreText);

    elListItem.appendChild(elScoreContainer);
    return elListItem;
  }
}
