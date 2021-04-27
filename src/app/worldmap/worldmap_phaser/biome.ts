import { Region, Type } from '../../_models/region';

function biomAt(x: number, y: number, allBiomes: Region[]): Type
{
    return allBiomes.find(region => region.x === x &&
        region.y === y).type;
}

export default function biomgenerator(x: number, y: number, biom: Type, allBiomes: Region[])
{
    const surrondings = [[-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0] ];
    const neededSprites = [];


    for (let i = 0; i < 4; i++) // goes in 4 times for every location conected to the given one
    {
        // checks all four locations (top bottom right left) for same biomes
        if (biomAt(x + surrondings[1 + i * 2][0], y + surrondings[1 + i * 2][1], allBiomes) !== biom) {
            neededSprites.push(i);
        }
    }

    // console.log(neededSprites)


    if (neededSprites.length > 2)
    {
        neededSprites.push(4, 5, 6, 7);
        if (neededSprites.length === 7)
        {
            const OnlyConected = 6 - (neededSprites[0] + neededSprites[1] + neededSprites[2]);
            // console.log(OnlyConected);
            for (let i = 0; i < 3; i++)
            {
                if (i === OnlyConected)
                {
                    neededSprites.splice(i + 3, 2);
                }
            }
            return neededSprites;
        }
        if (neededSprites.length === 8)
        {
            return neededSprites;
        }
    }

    else
    {
        if (neededSprites.length === 2)
        {
            if (neededSprites[1] - neededSprites[0] === 2)
            {
                return neededSprites;
                console.log(neededSprites);
                console.log('noChanges');

            }

            else
            {
                if (JSON.stringify(neededSprites) === JSON.stringify([0, 1]))
                {
                    neededSprites.push(7);
                    if (biomAt(x + surrondings[3][0], y + surrondings[3][1], allBiomes) !== biom)
                    {
                        neededSprites.push(9);
                    }
                }
                if (JSON.stringify(neededSprites) === JSON.stringify([1, 2]))
                {
                    neededSprites.push(4);
                    if (biomAt(x + surrondings[5][0], y + surrondings[5][1], allBiomes) !== biom)
                    {
                        neededSprites.push(10);
                    }
                }
                if (JSON.stringify(neededSprites) === JSON.stringify([2, 3]))
                {
                    neededSprites.push(5);
                    if (biomAt(x + surrondings[7][0], y + surrondings[7][1], allBiomes) !== biom)
                    {
                        neededSprites.push(11);
                    }
                }
                if (JSON.stringify(neededSprites) === JSON.stringify([0, 3]))
                {
                    neededSprites.push(6);
                    if (biomAt(x + surrondings[0][0], y + surrondings[0][1], allBiomes) !== biom)
                    {
                        neededSprites.push(8);
                    }
                }
                return neededSprites;
            }
        }

        if (neededSprites.length === 1)
        {
            const GIANTLIST = [ [[0], [10, 11]], [[1], [8, 11]], [[2], [8, 9]], [[3], [9, 10]] ];
            for (let i = 0; i < 4; i++)
            {
                if (JSON.stringify(neededSprites) === JSON.stringify(GIANTLIST[i][0]))
                {
                    for (let j = 0; j < 2; j++)
                    {
                        if (biomAt(x +  surrondings[(GIANTLIST[i][1][j] - 8) * 2 ][0], y +
                                        surrondings[ (GIANTLIST[i][1][j] - 8) * 2 ][1], allBiomes) !== biom)
                        {
                            neededSprites.push(GIANTLIST[i][1][j]);
                        }
                    }
                }
            }
            return neededSprites;
        }

        if (neededSprites.length === 0)
        {
            const GIANTLISTII = [ 8, 9, 10, 11 ];
            for (let i = 0; i < 4; i++)
            {
                if (biomAt(x +  surrondings[(GIANTLISTII[i] - 8) * 2][0], y +
                                surrondings[(GIANTLISTII[i] - 8) * 2][1], allBiomes) !== biom)
                {
                    neededSprites.push(GIANTLISTII[i]);
                }
            }
            return neededSprites;
        }
    }
}