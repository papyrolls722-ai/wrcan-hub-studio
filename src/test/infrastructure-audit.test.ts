import { describe, expect, it } from "vitest";
import {
  areaSqm,
  indoorCapacity,
  outdoorCapacity,
  pottiesRequired,
  staffToiletsRequired,
  SQM_PER_CHILD_INDOOR,
  SQM_PER_CHILD_OUTDOOR,
} from "@/lib/infrastructure-audit";

describe("infrastructure audit rules", () => {
  it("computes area as length × width", () => {
    expect(areaSqm(6, 5)).toBe(30);
  });

  it("allows 1.5 sqm per child indoors", () => {
    expect(SQM_PER_CHILD_INDOOR).toBe(1.5);
    expect(indoorCapacity(30)).toBe(20);
    expect(indoorCapacity(31)).toBe(20);
  });

  it("allows 2 sqm per child outdoors", () => {
    expect(SQM_PER_CHILD_OUTDOOR).toBe(2);
    expect(outdoorCapacity(40)).toBe(20);
    expect(outdoorCapacity(41)).toBe(20);
  });

  it("requires 1 potty per 20 children", () => {
    expect(pottiesRequired(20)).toBe(1);
    expect(pottiesRequired(21)).toBe(2);
  });

  it("requires 1 toilet per 20 staff", () => {
    expect(staffToiletsRequired(20)).toBe(1);
    expect(staffToiletsRequired(21)).toBe(2);
  });
});
