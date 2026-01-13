import { describe, it, expect } from "vitest";
import {
  TOTAL_CALLS_MADE,
  UNIQUE_CUSTOMERS,
  LEADS_PICKED_UP,
  INTERESTED_LEADS,
  QUALIFIED_BUYERS,
} from "./metrics";

describe("Critical Metrics Constants", () => {
  it("should have correct total calls made", () => {
    expect(TOTAL_CALLS_MADE.number).toBe(31070);
    expect(TOTAL_CALLS_MADE.display).toBe("31,070");
  });

  it("should have correct unique customers", () => {
    expect(UNIQUE_CUSTOMERS.number).toBe(22169);
    expect(UNIQUE_CUSTOMERS.display).toBe("22,169");
  });

  it("should have correct leads picked up", () => {
    expect(LEADS_PICKED_UP.number).toBe(3268);
    expect(LEADS_PICKED_UP.display).toBe("3,268");
    expect(LEADS_PICKED_UP.percent).toBe("14.7%");
  });

  it("should have correct interested leads", () => {
    expect(INTERESTED_LEADS.number).toBe(2004);
    expect(INTERESTED_LEADS.display).toBe("2,004");
    expect(INTERESTED_LEADS.percent).toBe("61%");
  });

  it("should have correct qualified buyers", () => {
    expect(QUALIFIED_BUYERS.number).toBe(576);
    expect(QUALIFIED_BUYERS.display).toBe("576");
    expect(QUALIFIED_BUYERS.percent).toBe("18%");
  });
});

