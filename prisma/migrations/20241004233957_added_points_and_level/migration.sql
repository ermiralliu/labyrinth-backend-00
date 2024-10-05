/*
  Warnings:

  - Added the required column `level` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "boardId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "boardName" TEXT NOT NULL,
    "boardString" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Board" ("boardId", "boardName", "boardString", "createdAt", "userId") SELECT "boardId", "boardName", "boardString", "createdAt", "userId" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
