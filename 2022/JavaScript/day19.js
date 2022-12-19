import * as fs from 'fs';

const timer = (script, input, timer, part) => {
    let start = performance.now();
    script(input, timer, part);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const parse = (input) => {
    const blueprints = new Array();
    for (const line of input) {
        const { groups } =
            /Blueprint (?<id>\d+): Each ore robot costs (?<oreRobotOreCost>\d+) ore. Each clay robot costs (?<clayRobotOreCost>\d+) ore. Each obsidian robot costs (?<obsidianRobotOreCost>\d+) ore and (?<obsidianRobotClayCost>\d+) clay. Each geode robot costs (?<geodeRobotOreCost>\d+) ore and (?<geodeRobotObsidianCost>\d+) obsidian./.exec(
                line
            );
        blueprints.push({
            id: Number(groups.id),
            oreRobotOreCost: Number(groups.oreRobotOreCost),
            clayRobotOreCost: Number(groups.clayRobotOreCost),
            obsidianRobotOreCost: Number(groups.obsidianRobotOreCost),
            obsidianRobotClayCost: Number(groups.obsidianRobotClayCost),
            geodeRobotOreCost: Number(groups.geodeRobotOreCost),
            geodeRobotObsidianCost: Number(groups.geodeRobotObsidianCost),
        });
    }
    return blueprints;
};

const solveParts = (input, timer, part) => {
    const blueprints = parse(input);
    let result = part === 1 ? 0 : 1,
        count = 1;
    blueprints.forEach((blueprint) => {
        if (count > 3 && part === 2) {
            return;
        }
        let maxGeode = 0;
        let maxRobots = {
            oreRobot: Math.max(
                blueprint.oreRobotOreCost,
                blueprint.clayRobotOreCost,
                blueprint.obsidianRobotOreCost,
                blueprint.geodeRobotOreCost
            ),
            clayRobot: blueprint.obsidianRobotClayCost,
        };

        const build = (timer, oreRobot, clayRobot, obsidianRobot, ore, clay, obsidian, geode) => {
            if (timer < 1) return;
            if (geode > maxGeode) {
                maxGeode = geode;
            }

            if (obsidianRobot > 0) {
                let enoughOre, enoughObsidian, oreMissing, oreLeft, obsidianMissing, obsidianLeft;
                if (blueprint.geodeRobotOreCost > ore) {
                    oreMissing = blueprint.geodeRobotOreCost - ore;
                    enoughOre = false;
                } else {
                    oreLeft = blueprint.geodeRobotOreCost - ore;
                    enoughOre = true;
                }
                if (blueprint.geodeRobotObsidianCost > obsidian) {
                    obsidianMissing = blueprint.geodeRobotObsidianCost - obsidian;
                    enoughObsidian = false;
                } else {
                    obsidianLeft = blueprint.geodeRobotOreCost - obsidian;
                    enoughObsidian = true;
                }
                let extraTime =
                    1 +
                    (enoughOre && enoughObsidian
                        ? 0
                        : enoughOre
                        ? Math.ceil(obsidianMissing / obsidianRobot)
                        : enoughObsidian
                        ? Math.ceil(oreMissing / oreRobot)
                        : Math.max(Math.ceil(oreMissing / oreRobot), Math.ceil(obsidianMissing / obsidianRobot)));
                build(
                    timer - extraTime,
                    oreRobot,
                    clayRobot,
                    obsidianRobot,
                    ore - blueprint.geodeRobotOreCost + extraTime * oreRobot,
                    clay + extraTime * clayRobot,
                    obsidian - blueprint.geodeRobotObsidianCost + extraTime * obsidianRobot,
                    geode + timer - extraTime
                );
                if (enoughOre && enoughObsidian) return;
            }

            if (clayRobot > 0) {
                let enoughOre, enoughClay, oreMissing, oreLeft, clayMissing, clayLeft;
                if (blueprint.obsidianRobotOreCost > ore) {
                    oreMissing = blueprint.obsidianRobotOreCost - ore;
                    enoughOre = false;
                } else {
                    oreLeft = blueprint.obsidianRobotOreCost - ore;
                    enoughOre = true;
                }
                if (blueprint.obsidianRobotClayCost > clay) {
                    clayMissing = blueprint.obsidianRobotClayCost - clay;
                    enoughClay = false;
                } else {
                    clayLeft = blueprint.obsidianRobotClayCost - clay;
                    enoughClay = true;
                }
                let extraTime =
                    1 +
                    (enoughOre && enoughClay
                        ? 0
                        : enoughOre
                        ? Math.ceil(clayMissing / clayRobot)
                        : enoughClay
                        ? Math.ceil(oreMissing / oreRobot)
                        : Math.max(Math.ceil(oreMissing / oreRobot), Math.ceil(clayMissing / clayRobot)));
                build(
                    timer - extraTime,
                    oreRobot,
                    clayRobot,
                    obsidianRobot + 1,
                    ore - blueprint.obsidianRobotOreCost + extraTime * oreRobot,
                    clay - blueprint.obsidianRobotClayCost + extraTime * clayRobot,
                    obsidian + extraTime * obsidianRobot,
                    geode
                );
            }

            if (clayRobot < maxRobots.clayRobot) {
                let enoughOre, oreMissing, oreLeft;
                if (blueprint.clayRobotOreCost > ore) {
                    oreMissing = blueprint.clayRobotOreCost - ore;
                    enoughOre = false;
                } else {
                    oreLeft = blueprint.clayRobotOreCost - ore;
                    enoughOre = true;
                }
                let extraTime = 1 + (enoughOre ? 0 : Math.ceil(oreMissing / oreRobot));
                build(
                    timer - extraTime,
                    oreRobot,
                    clayRobot + 1,
                    obsidianRobot,
                    ore + extraTime * oreRobot - blueprint.clayRobotOreCost,
                    clay + extraTime * clayRobot,
                    obsidian + extraTime * obsidianRobot,
                    geode
                );
            }

            if (oreRobot < maxRobots.oreRobot) {
                let enoughOre, oreMissing, oreLeft;
                if (blueprint.oreRobotOreCost > ore) {
                    oreMissing = blueprint.oreRobotOreCost - ore;
                    enoughOre = false;
                } else {
                    oreLeft = blueprint.oreRobotOreCost - ore;
                    enoughOre = true;
                }
                let extraTime = 1 + (enoughOre ? 0 : Math.ceil(oreMissing / oreRobot));
                build(
                    timer - extraTime,
                    oreRobot + 1,
                    clayRobot,
                    obsidianRobot,
                    ore - blueprint.oreRobotOreCost + extraTime * oreRobot,
                    clay + extraTime * clayRobot,
                    obsidian + extraTime * obsidianRobot,
                    geode
                );
            }
        };
        build(timer, 1, 0, 0, 0, 0, 0, 0);
        count++;
        if (part === 1) result += maxGeode * blueprint.id;
        else result *= maxGeode;
    });
    return result;
};

['example19.txt', 'puzzle19.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').split('\n');
    console.log(
        `Result of part one for ${file} : ` +
            solveParts(input, 24, 1) +
            ` (executed in ${timer(solveParts, input, 24, 1)} ms)`
    );
    console.log(
        `Result of part one for ${file} : ` +
            solveParts(input, 32, 2) +
            ` (executed in ${timer(solveParts, input, 32, 2)} ms)`
    );
});
