/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `places` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "places_id_key" ON "places"("id");
