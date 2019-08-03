const parseJson = <T>(str?: string | null): (T | undefined) => {
    if (!str) {
        return undefined;
    }

    try {
        const result = JSON.parse(str) as T;

        return result;
    } catch (exception) {
        return undefined;
    }
};

export default parseJson;
