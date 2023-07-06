-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "modality" TEXT NOT NULL DEFAULT 'Remote',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applierId" INTEGER NOT NULL,
    CONSTRAINT "Job_applierId_fkey" FOREIGN KEY ("applierId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("applierId", "company", "createdAt", "id", "name") SELECT "applierId", "company", "createdAt", "id", "name" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
