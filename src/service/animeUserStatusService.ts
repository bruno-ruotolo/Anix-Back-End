import animeUserStatusRepository from "../repositories/animeUserStatusRepository.js";

async function getAnimesByStatus(
  userId: number,
  queryStatus: string | string[] | any
) {
  const status = queryStatus?.trim().toLowerCase();

  if (status === "done" || status === "maybe") {
    const { id: statusId } = await animeUserStatusRepository.getStatusByName(
      status
    );

    const statusAnimes =
      await animeUserStatusRepository.getAnimeByStatusIdAndUserId(
        statusId,
        userId
      );
    return statusAnimes;
  }

  const { id: statusId } = await animeUserStatusRepository.getStatusByName(
    "watching"
  );

  const statusAnimes =
    await animeUserStatusRepository.getAnimeByStatusIdAndUserId(
      statusId,
      userId
    );
  return statusAnimes;
}

const animeUserStatusService = { getAnimesByStatus };
export default animeUserStatusService;
