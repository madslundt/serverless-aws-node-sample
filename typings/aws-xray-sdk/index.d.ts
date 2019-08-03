// Type definitions for aws-xray-sdk 2.2
// Project: https://github.com/mziyabo-aws/aws-xray-typings (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: <https://github.com/mziyabo-aws>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module "aws-xray-sdk" {

    export class Segment {
        constructor(name: any, rootId: any, parentId: any);

        addAnnotation(key: any, value: any): void;

        addError(err: any, remote: any): void;

        addErrorFlag(): void;

        addFaultFlag(): void;

        addIncomingRequestData(data: any): void;

        addMetadata(key: any, value: any, namespace: any): void;

        addNewSubsegment(name: any): any;

        addPluginData(data: any): void;

        addSubsegment(subsegment: any): void;

        addThrottleFlag(): void;

        close(err: any, remote: any): void;

        decrementCounter(): void;

        flush(): void;

        format(): any;

        incrementCounter(additional: any): void;

        init(name: any, rootId: any, parentId: any): void;

        isClosed(): any;

        removeSubsegment(subsegment: any): void;

        setMatchedSamplingRule(ruleName: any): void;

        setSDKData(data: any): void;

        setServiceData(data: any): void;

        toString(): any;

    }

    export class Subsegment {
        constructor(name: any);

        addAnnotation(key: any, value: any): void;

        addAttribute(name: any, data: any): void;

        addError(err: any, remote: any): void;

        addErrorFlag(): void;

        addFaultFlag(): void;

        addMetadata(key: any, value: any, namespace: any): void;

        addNewSubsegment(name: any): any;

        addPrecursorId(id: any): void;

        addRemoteRequestData(req: any, res: any, downstreamXRayEnabled: any): void;

        addSqlData(sqlData: any): void;

        addSubsegment(subsegment: any): void;

        addThrottleFlag(): void;

        close(err: any, remote: any): void;

        decrementCounter(): void;

        flush(): void;

        format(): any;

        incrementCounter(additional: any): void;

        init(name: any): void;

        isClosed(): any;

        removeSubsegment(subsegment: any): void;

        streamSubsegments(): any;

        toJSON(): any;

        toString(): any;

    }

    export const plugins: {
        EC2Plugin: {
            getData: any;
            originName: string;
        };
        ECSPlugin: {
            getData: any;
            originName: string;
        };
        ElasticBeanstalkPlugin: {
            getData: any;
            originName: string;
        };
    };

    export function appendAWSWhitelist(source: any): void;

    export function captureAWS(awssdk: any): any;

    export function captureAWSClient(service: any): any;

    export function captureAsyncFunc(name: any, fcn: any, parent: any): any;

    export function captureCallbackFunc(name: any, fcn: any, parent: any, ...args: any[]): any;

    export function captureFunc(name: any, fcn: any, parent: any): any;

    export function captureHTTPs(module: any, downstreamXRayEnabled: any): any;

    export function captureHTTPsGlobal(module: any, downstreamXRayEnabled: any): void;

    export function captureMySQL(mysql: any): any;

    export function capturePostgres(pg: any): any;

    export function capturePromise(): void;

    export function config(plugins: any): void;

    export function enableAutomaticMode(): void;

    export function enableManualMode(): void;

    export function getLogger(): any;

    export function getNamespace(): any;

    export function getSegment(): any;

    export function isAutomaticMode(): any;

    export function resolveSegment(segment: any): any;

    export function setAWSWhitelist(source: any): void;

    export function setContextMissingStrategy(strategy: any): void;

    export function setDaemonAddress(address: any): void;

    export function setLogger(logObj: any): void;

    export function setSegment(segment: any): void;

    export function setStreamingThreshold(threshold: any): void;

    export namespace Segment {
        namespace prototype {
            function addAnnotation(key: any, value: any): void;

            function addError(err: any, remote: any): void;

            function addErrorFlag(): void;

            function addFaultFlag(): void;

            function addIncomingRequestData(data: any): void;

            function addMetadata(key: any, value: any, namespace: any): void;

            function addNewSubsegment(name: any): any;

            function addPluginData(data: any): void;

            function addSubsegment(subsegment: any): void;

            function addThrottleFlag(): void;

            function close(err: any, remote: any): void;

            function decrementCounter(): void;

            function flush(): void;

            function format(): any;

            function incrementCounter(additional: any): void;

            function init(name: any, rootId: any, parentId: any): void;

            function isClosed(): any;

            function removeSubsegment(subsegment: any): void;

            function setMatchedSamplingRule(ruleName: any): void;

            function setSDKData(data: any): void;

            function setServiceData(data: any): void;

            function toString(): any;

            namespace addAnnotation {
                const prototype: {
                };

            }

            namespace addError {
                const prototype: {
                };

            }

            namespace addErrorFlag {
                const prototype: {
                };

            }

            namespace addFaultFlag {
                const prototype: {
                };

            }

            namespace addIncomingRequestData {
                const prototype: {
                };

            }

            namespace addMetadata {
                const prototype: {
                };

            }

            namespace addNewSubsegment {
                const prototype: {
                };

            }

            namespace addPluginData {
                const prototype: {
                };

            }

            namespace addSubsegment {
                const prototype: {
                };

            }

            namespace addThrottleFlag {
                const prototype: {
                };

            }

            namespace close {
                const prototype: {
                };

            }

            namespace decrementCounter {
                const prototype: {
                };

            }

            namespace flush {
                const prototype: {
                };

            }

            namespace format {
                const prototype: {
                };

            }

            namespace incrementCounter {
                const prototype: {
                };

            }

            namespace init {
                const prototype: {
                };

            }

            namespace isClosed {
                const prototype: {
                };

            }

            namespace removeSubsegment {
                const prototype: {
                };

            }

            namespace setMatchedSamplingRule {
                const prototype: {
                };

            }

            namespace setSDKData {
                const prototype: {
                };

            }

            namespace setServiceData {
                const prototype: {
                };

            }

            namespace toString {
                const prototype: {
                };

            }

        }

    }

    export namespace SegmentUtils {
        const sdkData: {
            package: string;
            sdk: string;
            sdk_version: string;
        };

        const serviceData: {
            name: string;
            runtime: string;
            runtime_version: string;
            version: string;
        };

        const streamingThreshold: number;

        function getCurrentTime(): any;

        function getStreamingThreshold(): any;

        function setOrigin(origin: any): void;

        function setPluginData(pluginData: any): void;

        function setSDKData(sdkData: any): void;

        function setServiceData(serviceData: any): void;

        function setStreamingThreshold(threshold: any): void;

        namespace getCurrentTime {
            const prototype: {
            };

        }

        namespace getStreamingThreshold {
            const prototype: {
            };

        }

        namespace setOrigin {
            const prototype: {
            };

        }

        namespace setPluginData {
            const prototype: {
            };

        }

        namespace setSDKData {
            const prototype: {
            };

        }

        namespace setServiceData {
            const prototype: {
            };

        }

        namespace setStreamingThreshold {
            const prototype: {
            };

        }

    }

    export namespace Subsegment {
        namespace prototype {
            function addAnnotation(key: any, value: any): void;

            function addAttribute(name: any, data: any): void;

            function addError(err: any, remote: any): void;

            function addErrorFlag(): void;

            function addFaultFlag(): void;

            function addMetadata(key: any, value: any, namespace: any): void;

            function addNewSubsegment(name: any): any;

            function addPrecursorId(id: any): void;

            function addRemoteRequestData(req: any, res: any, downstreamXRayEnabled: any): void;

            function addSqlData(sqlData: any): void;

            function addSubsegment(subsegment: any): void;

            function addThrottleFlag(): void;

            function close(err: any, remote: any): void;

            function decrementCounter(): void;

            function flush(): void;

            function format(): any;

            function incrementCounter(additional: any): void;

            function init(name: any): void;

            function isClosed(): any;

            function removeSubsegment(subsegment: any): void;

            function streamSubsegments(): any;

            function toJSON(): any;

            function toString(): any;

            namespace addAnnotation {
                const prototype: {
                };

            }

            namespace addAttribute {
                const prototype: {
                };

            }

            namespace addError {
                const prototype: {
                };

            }

            namespace addErrorFlag {
                const prototype: {
                };

            }

            namespace addFaultFlag {
                const prototype: {
                };

            }

            namespace addMetadata {
                const prototype: {
                };

            }

            namespace addNewSubsegment {
                const prototype: {
                };

            }

            namespace addPrecursorId {
                const prototype: {
                };

            }

            namespace addRemoteRequestData {
                const prototype: {
                };

            }

            namespace addSqlData {
                const prototype: {
                };

            }

            namespace addSubsegment {
                const prototype: {
                };

            }

            namespace addThrottleFlag {
                const prototype: {
                };

            }

            namespace close {
                const prototype: {
                };

            }

            namespace decrementCounter {
                const prototype: {
                };

            }

            namespace flush {
                const prototype: {
                };

            }

            namespace format {
                const prototype: {
                };

            }

            namespace incrementCounter {
                const prototype: {
                };

            }

            namespace init {
                const prototype: {
                };

            }

            namespace isClosed {
                const prototype: {
                };

            }

            namespace removeSubsegment {
                const prototype: {
                };

            }

            namespace streamSubsegments {
                const prototype: {
                };

            }

            namespace toJSON {
                const prototype: {
                };

            }

            namespace toString {
                const prototype: {
                };

            }

        }

    }

    export namespace appendAWSWhitelist {
        const prototype: {
        };

    }

    export namespace captureAWS {
        const prototype: {
        };

    }

    export namespace captureAWSClient {
        const prototype: {
        };

    }

    export namespace captureAsyncFunc {
        const prototype: {
        };

    }

    export namespace captureCallbackFunc {
        const prototype: {
        };

    }

    export namespace captureFunc {
        const prototype: {
        };

    }

    export namespace captureHTTPs {
        const prototype: {
        };

    }

    export namespace captureHTTPsGlobal {
        const prototype: {
        };

    }

    export namespace captureMySQL {
        const prototype: {
        };

    }

    export namespace capturePostgres {
        const prototype: {
        };

    }

    export namespace capturePromise {
        const prototype: {
        };

        function patchThirdPartyPromise(Promise: any): any;

        namespace patchThirdPartyPromise {
            const prototype: {
            };

        }

    }

    export namespace config {
        const prototype: {
        };

    }

    export namespace database {
        class SqlData {
            constructor(databaseVer: any, driverVer: any, user: any, url: any, queryType: any);

            init(databaseVer: any, driverVer: any, user: any, url: any, queryType: any): void;

        }

        namespace SqlData {
            namespace prototype {
                function init(databaseVer: any, driverVer: any, user: any, url: any, queryType: any): void;

                namespace init {
                    // Too-deep object hierarchy from aws_xray_sdk.database.SqlData.prototype.init
                    const prototype: any;

                }

            }

        }

    }

    export namespace enableAutomaticMode {
        const prototype: {
        };

    }

    export namespace enableManualMode {
        const prototype: {
        };

    }

    export namespace express {
        function closeSegment(): any;

        function openSegment(defaultName: any): any;

        namespace closeSegment {
            const prototype: {
            };

        }

        namespace openSegment {
            const prototype: {
            };

        }

    }

    export namespace getLogger {
        const prototype: {
        };

    }

    export namespace getNamespace {
        const prototype: {
        };

    }

    export namespace getSegment {
        const prototype: {
        };

    }

    export namespace isAutomaticMode {
        const prototype: {
        };

    }

    export namespace middleware {
        class IncomingRequestData {
            constructor(req: any);

            close(res: any): void;

            init(req: any): void;

        }

        const defaultName: any;

        const dynamicNaming: boolean;

        const hostPattern: any;

        function disableCentralizedSampling(): void;

        function enableDynamicNaming(hostPattern: any): void;

        function processHeaders(req: any): any;

        function resolveName(hostHeader: any): any;

        function resolveSampling(amznTraceHeader: any, segment: any, res: any): void;

        function setDefaultName(name: any): void;

        function setSamplingRules(source: any): void;

        namespace IncomingRequestData {
            namespace prototype {
                function close(res: any): void;

                function init(req: any): void;

                namespace close {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.IncomingRequestData.prototype.close
                    const prototype: any;

                }

                namespace init {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.IncomingRequestData.prototype.init
                    const prototype: any;

                }

            }

        }

        namespace disableCentralizedSampling {
            const prototype: {
            };

        }

        namespace enableDynamicNaming {
            const prototype: {
            };

        }

        namespace processHeaders {
            const prototype: {
            };

        }

        namespace resolveName {
            const prototype: {
            };

        }

        namespace resolveSampling {
            const prototype: {
            };

        }

        namespace sampler {
            const started: boolean;

            function setLocalRules(source: any): void;

            function shouldSample(sampleRequest: any): any;

            function start(): void;

            namespace localSampler {
                const rules: {
                    default: boolean;
                    reservoir: {
                        fallbackRate: number;
                        fixedTarget: number;
                        init: any;
                        isSampled: any;
                        usedThisSecond: number;
                    };
                }[];

                function setLocalRules(source: any): void;

                function shouldSample(sampleRequest: any): any;

                namespace setLocalRules {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.localSampler.setLocalRules
                    const prototype: any;

                }

                namespace shouldSample {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.localSampler.shouldSample
                    const prototype: any;

                }

            }

            namespace ruleCache {
                const lastUpdated: any;

                const rules: any[];

                function getLastUpdated(): any;

                function getMatchedRule(sampleRequest: any, now: any): any;

                function getRules(): any;

                function loadRules(rules: any): any;

                function loadTargets(targetsMapping: any): void;

                function timestamp(now: any): void;

                namespace getLastUpdated {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.ruleCache.getLastUpdated
                    const prototype: any;

                }

                namespace getMatchedRule {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.ruleCache.getMatchedRule
                    const prototype: any;

                }

                namespace getRules {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.ruleCache.getRules
                    const prototype: any;

                }

                namespace loadRules {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.ruleCache.loadRules
                    const prototype: any;

                }

                namespace loadTargets {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.ruleCache.loadTargets
                    const prototype: any;

                }

                namespace timestamp {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.ruleCache.timestamp
                    const prototype: any;

                }

            }

            namespace rulePoller {
                function start(): void;

                namespace start {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.rulePoller.start
                    const prototype: any;

                }

            }

            namespace setLocalRules {
                const prototype: {
                };

            }

            namespace shouldSample {
                const prototype: {
                };

            }

            namespace start {
                const prototype: {
                };

            }

            namespace targetPoller {
                const interval: number;

                function start(): void;

                namespace start {
                    // Too-deep object hierarchy from aws_xray_sdk.middleware.sampler.targetPoller.start
                    const prototype: any;

                }

            }

        }

        namespace setDefaultName {
            const prototype: {
            };

        }

        namespace setSamplingRules {
            const prototype: {
            };

        }

    }

    export namespace resolveSegment {
        const prototype: {
        };

    }

    export namespace setAWSWhitelist {
        const prototype: {
        };

    }

    export namespace setContextMissingStrategy {
        const prototype: {
        };

    }

    export namespace setDaemonAddress {
        const prototype: {
        };

    }

    export namespace setLogger {
        const prototype: {
        };

    }

    export namespace setSegment {
        const prototype: {
        };

    }

    export namespace setStreamingThreshold {
        const prototype: {
        };

    }

    export namespace utils {
        function getCauseTypeFromHttpStatus(status: any): any;

        function processTraceData(traceData: any): any;

        function wildcardMatch(pattern: any, text: any): any;

        namespace LambdaUtils {
            function populateTraceData(segment: any, xAmznTraceId: any): any;

            function validTraceData(xAmznTraceId: any): any;

            namespace populateTraceData {
                const prototype: {
                };

            }

            namespace validTraceData {
                const prototype: {
                };

            }

        }

        namespace getCauseTypeFromHttpStatus {
            const prototype: {
            };

        }

        namespace processTraceData {
            const prototype: {
            };

        }

        namespace wildcardMatch {
            const prototype: {
            };

        }

    }
}