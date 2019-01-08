import axios from "../lib/http"
// 获取数据
export function getARPGGamesData() {
  return axios.post("/ARPGGames");
}
