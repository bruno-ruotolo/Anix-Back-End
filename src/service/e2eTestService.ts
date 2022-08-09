import e2eTestRepository from "../repositories/e2eTestRepository.js";

async function deleteAllDataService() {
  return await e2eTestRepository.deleteAllData();
}

export const e2eTestService = {
  deleteAllDataService,
};
